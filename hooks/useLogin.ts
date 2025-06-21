import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "@/utils/supabase/client";
import { validateLoginForm } from "@/utils/validation";
import { toast } from "sonner";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = validateLoginForm(email, password);
    if (!validation.isValid) {
      setError(validation.error || "Validation failed");
      return;
    }

    setIsLoading(true);

    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      } else if (data.user) {
        setEmail("");
        setPassword("");
        
        // Show success toast
        toast.success("Welcome back!", {
          description: "You have been successfully logged in.",
        });
        
        // Redirect to the page they were trying to access, or home
        const redirectTo = searchParams.get('redirectTo') || '/';
        router.push(redirectTo);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred while logging in. Please try again.";
      setError(errorMessage);
      
      // Also show error toast
      toast.error("Login failed", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    isLoading,
    error,
  };
};