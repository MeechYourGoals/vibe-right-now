
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, AlertCircle, Wand2 } from "lucide-react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
}

export function AuthDialog({ open, onOpenChange, mode, onModeChange }: AuthDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  const { signIn, signUp, signInWithGoogle, signInWithMagicLink, isLoading } = useSupabaseAuth();
  const [submitting, setSubmitting] = useState(false);
  const busy = isLoading || submitting;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      // Basic validation
      if (!email.trim() || !password) {
        throw new Error("Email and password are required");
      }

      if (mode === 'signup' && password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (mode === 'signup') {
        await signUp(email.trim(), password);
        toast({
          title: "Check your inbox",
          description: "We sent you a confirmation link to finish creating your account.",
        });
      } else {
        await signIn(email.trim(), password);
        toast({ title: "Welcome back!", description: "You're now signed in." });
        onOpenChange(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication error",
        description: error instanceof Error ? error.message : "Something went wrong",
        action: (
          <Button variant="outline" size="sm">
            <AlertCircle className="h-4 w-4" />
          </Button>
        ),
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setSubmitting(true);
      await signInWithGoogle();
      // Redirect happens; dialog will close on return.
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google authentication error",
        description: error instanceof Error ? error.message : "Something went wrong with Google sign-in",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleMagicLink = async () => {
    try {
      setSubmitting(true);
      if (!email.trim()) {
        throw new Error("Enter your email to receive a magic link");
      }
      await signInWithMagicLink(email.trim());
      toast({
        title: "Magic link sent",
        description: "Check your email for a link to sign in.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Magic link error",
        description: error instanceof Error ? error.message : "Could not send the magic link",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'signin' ? 'Sign in to your account' : 'Create a new account'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'signin' 
              ? 'Enter your email below to sign in to your account.'
              : 'Enter your email below to create your account.'}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={mode} onValueChange={(value) => onModeChange(value as 'signin' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={busy}>
                {busy ? "Signing in..." : "Sign In with Email"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleAuth}
                disabled={busy}
                type="button"
              >
                <Mail className="mr-2 h-4 w-4" /> Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleMagicLink}
                disabled={busy}
                type="button"
              >
                <Wand2 className="mr-2 h-4 w-4" /> Email me a magic link
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={busy}>
                {busy ? "Creating account..." : "Sign Up with Email"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleAuth}
                disabled={busy}
                type="button"
              >
                <Mail className="mr-2 h-4 w-4" /> Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleMagicLink}
                disabled={busy}
                type="button"
              >
                <Wand2 className="mr-2 h-4 w-4" /> Email me a magic link
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
