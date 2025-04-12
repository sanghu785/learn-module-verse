
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactSubmission } from "@/components/WhatsAppContact";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { Shield, LogOut, Trash2 } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simple admin password - in a real app, use proper authentication
  const ADMIN_PASSWORD = "admin123"; // Change this to your preferred password

  useEffect(() => {
    // Check if admin is already logged in
    const adminAuth = localStorage.getItem("adminAuthenticated");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
      loadContacts();
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadContacts = () => {
    setIsLoading(true);
    try {
      const submissions = JSON.parse(localStorage.getItem("contactSubmissions") || "[]");
      setContacts(submissions);
    } catch (error) {
      console.error("Error loading contacts:", error);
      toast.error("Failed to load contact information");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      loadContacts();
      toast.success("Admin login successful");
    } else {
      toast.error("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
    navigate("/");
    toast.success("Logged out successfully");
  };

  const handleDeleteContact = (id: string) => {
    try {
      const updatedContacts = contacts.filter(contact => contact.id !== id);
      localStorage.setItem("contactSubmissions", JSON.stringify(updatedContacts));
      setContacts(updatedContacts);
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-10 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-brand-800" />
              Admin Login
            </CardTitle>
            <CardDescription>
              Enter your admin password to view contact submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
              >
                Login as Admin
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Submissions</CardTitle>
          <CardDescription>
            All user contact submissions from the holistic healing course
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-6">Loading contact data...</div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">No contact submissions yet</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.message}</TableCell>
                    <TableCell>{formatDistanceToNow(new Date(contact.timestamp), { addSuffix: true })}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteContact(contact.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
