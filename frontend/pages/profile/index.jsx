"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Edit,
    KeyRound,
    Mail,
    Save,
    ShieldCheck,
    UserCircle,
    X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/components/layout/dashboard-layout"

import { Switch } from "@/components/ui/switch";

export default function ProfilePage() {
    const { user, isLoaded, isSignedIn } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("account");

    // Form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        bio: ""
    });

    // Initialize form data when user data is loaded
    useState(() => {
        if (isLoaded && isSignedIn && user) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.primaryEmailAddress?.emailAddress || "",
                bio: ""
            });
        }
    }, [isLoaded, isSignedIn, user]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    // Toggle edit mode
    const toggleEditMode = () => {
        // If canceling edit mode, reset form data
        if (isEditing) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.primaryEmailAddress?.emailAddress || "",
                bio: ""
            });
        }
        setIsEditing(!isEditing);
    };

    // Save profile changes
    const saveChanges = () => {
        // Here you would typically make an API call to update the user profile
        // For demonstration purposes, we'll just toggle out of edit mode
        setIsEditing(false);
        // Show success message or handle errors from API call
    };

    if (!isLoaded || !isSignedIn) {
        return (
            <div className="flex h-96 w-full items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Loading user profile...</h2>
                    <p className="text-muted-foreground">Please wait while we fetch your information.</p>
                </div>
            </div>
        );
    }

    return (
        <DashboardLayout>
        <div className="container max-w-6xl py-8">
            <div className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Profile Settings</h1>
                    <p className="text-muted-foreground">
                        {isEditing ? "Edit your profile information" : "View your account details and preferences"}
                    </p>
                </div>
                <Button variant="outline" className="gap-2" onClick={toggleEditMode}>
                    {isEditing ? (
                        <>
                            <X className="h-4 w-4" />
                            Cancel Editing
                        </>
                    ) : (
                        <>
                            <Edit className="h-4 w-4" />
                            Edit Profile
                        </>
                    )}
                </Button>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* User profile sidebar */}
                <Card className="md:col-span-1">
                    <CardHeader>
                        <div className="flex flex-col items-center text-center">
                            <Avatar className="h-24 w-24 mb-4">
                                <AvatarImage src={user.imageUrl} alt={user.fullName || "User"} />
                                <AvatarFallback>{user.firstName?.charAt(0) || "U"}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-xl">{user.fullName}</CardTitle>
                            <CardDescription>{user.primaryEmailAddress?.emailAddress}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <p className="text-sm text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <UserCircle className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Member since</p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Account status</p>
                                    <p className="text-sm text-green-500">Active</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Settings tabs */}
                <div className="md:col-span-2">
                    <Tabs defaultValue="account" className="w-full" onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="security">Security</TabsTrigger>
                            <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        </TabsList>

                        <TabsContent value="account" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Account Information</CardTitle>
                                    <CardDescription>
                                        {isEditing ? "Update your account details below" : "Your personal information and account details"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First name</Label>
                                            {isEditing ? (
                                                <Input
                                                    id="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/20">
                                                    {user.firstName || "Not set"}
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last name</Label>
                                            {isEditing ? (
                                                <Input
                                                    id="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/20">
                                                    {user.lastName || "Not set"}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        {isEditing ? (
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/20">
                                                {user.primaryEmailAddress?.emailAddress || "No email set"}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        {isEditing ? (
                                            <Input
                                                id="bio"
                                                placeholder="Tell us about yourself"
                                                value={formData.bio}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/20">
                                                {formData.bio || "No bio provided"}
                                            </div>
                                        )}
                                    </div>

                                    {isEditing && (
                                        <Button onClick={saveChanges} className="gap-2">
                                            <Save className="h-4 w-4" />
                                            Save changes
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="security" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Security Settings</CardTitle>
                                    <CardDescription>
                                        Manage your password and security preferences.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium flex gap-2 items-center">
                                            <KeyRound className="h-5 w-5" />
                                            Password
                                        </h3>

                                        {isEditing ? (
                                            <>
                                                <div className="space-y-2">
                                                    <Label htmlFor="current-password">Current password</Label>
                                                    <Input id="current-password" type="password" />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="new-password">New password</Label>
                                                    <Input id="new-password" type="password" />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="confirm-password">Confirm password</Label>
                                                    <Input id="confirm-password" type="password" />
                                                </div>

                                                <Button className="gap-2">
                                                    <Save className="h-4 w-4" />
                                                    Update password
                                                </Button>
                                            </>
                                        ) : (
                                            <div className="space-y-2">
                                                <p className="text-sm text-muted-foreground">
                                                    Your password was last updated on {new Date().toLocaleDateString()}.
                                                </p>
                                                <p className="text-sm">
                                                    For security reasons, we don't display your password. Click "Edit Profile" to change it.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-t pt-5">
                                        <h3 className="mb-4 text-lg font-medium">Two-factor authentication</h3>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Two-factor authentication</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Add an extra layer of security to your account.
                                                </p>
                                            </div>
                                            <Switch disabled={!isEditing} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                            <TabsContent value="notifications" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Notification Preferences</CardTitle>
                                        <CardDescription>
                                            Manage how and when you receive notifications.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Email notifications</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Receive notifications about account activity via email.
                                                </p>
                                            </div>
                                            <Switch
                                                defaultChecked={true}
                                                disabled={!isEditing}
                                                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Job alerts</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Get notified about new job matches and opportunities.
                                                </p>
                                            </div>
                                            <Switch
                                                defaultChecked={true}
                                                disabled={!isEditing}
                                                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Marketing emails</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Receive news, updates, and promotional content.
                                                </p>
                                            </div>
                                            <Switch
                                                disabled={!isEditing}
                                                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Application updates</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Get notified about the status of your job applications.
                                                </p>
                                            </div>
                                            <Switch
                                                defaultChecked={true}
                                                disabled={!isEditing}
                                                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                                            />
                                        </div>

                                        {isEditing && (
                                            <Button className="mt-4 gap-2">
                                                <Save className="h-4 w-4" />
                                                Save preferences
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
        </DashboardLayout>
    );
}