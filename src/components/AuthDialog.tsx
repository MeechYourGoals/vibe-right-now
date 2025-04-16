
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Github, AlertCircle, Fingerprint, Lock } from "lucide-react";
import { useAuth0Auth } from "@/hooks/useAuth0Auth";

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
  const { login, googleLogin, isLoading } = useAuth0Auth();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Basic validation
      if (!email.trim() || !password) {
        throw new Error("Email and password are required");
      }

      if (mode === 'signup' && password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      
      await login();
      
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
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await googleLogin();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google authentication error",
        description: error instanceof Error ? error.message : "Something went wrong with Google sign-in",
      });
    }
  };

  const handlePasskeyAuth = async () => {
    try {
      await login();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Passkey authentication error",
        description: error instanceof Error ? error.message : "Something went wrong with passkey sign-in",
      });
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In with Email"}
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
                disabled={isLoading}
                type="button"
              >
                <Mail className="mr-2 h-4 w-4" /> Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handlePasskeyAuth}
                disabled={isLoading}
                type="button"
              >
                <Fingerprint className="mr-2 h-4 w-4" /> Passkey
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign Up with Email"}
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
                disabled={isLoading}
                type="button"
              >
                <Mail className="mr-2 h-4 w-4" /> Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handlePasskeyAuth}
                disabled={isLoading}
                type="button"
              >
                <Fingerprint className="mr-2 h-4 w-4" /> Passkey
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
