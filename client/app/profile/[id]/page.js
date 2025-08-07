"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import PostCard from "@/components/PostCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, User, Edit2, Save, X } from "lucide-react";
import apiClient from "@/lib/axios";

export default function ProfilePage({ params }) {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const routerParams = useParams();

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle params properly - try multiple approaches
  useEffect(() => {
    const resolveParams = () => {
      try {
        // Try useParams hook first (most reliable in Next.js 15)
        if (routerParams?.id) {
          setUserId(routerParams.id);
          return;
        }

        // Try direct access to params prop
        if (params?.id) {
          setUserId(params.id);
          return;
        }

        // Try Promise approach for params prop
        if (params && typeof params.then === "function") {
          params
            .then((resolvedParams) => {
              if (resolvedParams?.id) {
                setUserId(resolvedParams.id);
              } else {
                setError("Invalid URL parameters");
                setLoading(false);
              }
            })
            .catch((error) => {
              setError("Invalid URL parameters");
              setLoading(false);
            });
          return;
        }

        setError("Invalid URL parameters");
        setLoading(false);
      } catch (error) {
        setError("Invalid URL parameters");
        setLoading(false);
      }
    };

    resolveParams();
  }, [params, routerParams]);

  // Bio update function
  const handleUpdateBio = async () => {
    setSaving(true);
    try {
      await apiClient.patch("/user/update-user", {
        bio: editBio,
      });

      // Update local state
      setProfile((prev) => ({ ...prev, bio: editBio }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating bio:", error);
      alert("Failed to update bio. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Start editing bio
  const startEditing = () => {
    setEditBio(profile.bio || "");
    setIsEditing(true);
  };

  // Cancel editing
  const cancelEditing = () => {
    setIsEditing(false);
    setEditBio("");
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!userId || userId === "undefined" || userId === null) {
      // If userId is still loading, don't show error yet
      if (userId === null) {
        return;
      }
      setError("Invalid user ID");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await apiClient.get(`/user/${userId}`);
        setProfile(response.data.user);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Failed to load profile");
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await apiClient.get(`/user/${userId}/posts`);
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        // Don't set error for posts, just log it
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchUserPosts();
  }, [user, userId, router]);

  if (!mounted) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
        <p className="mt-2 text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || "Profile not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">
                {profile.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{profile.name}</CardTitle>
              <div className="flex items-center space-x-4 mt-2 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Mail size={16} />
                  <span>{profile.email}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-start space-x-2">
            <User size={16} className="mt-1 text-gray-500" />
            <div className="flex-1">
              {!isEditing ? (
                <div className="flex items-start justify-between">
                  <p className="text-gray-700">
                    {profile.bio || "No bio added yet."}
                  </p>
                  {user && user._id === userId && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={startEditing}
                      className="ml-2 p-1 h-8 w-8"
                    >
                      <Edit2 size={14} />
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <Textarea
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    placeholder="Add your bio..."
                    className="min-h-[80px]"
                    maxLength={500}
                  />
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      onClick={handleUpdateBio}
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={14} className="mr-1" />
                          Save
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={cancelEditing}
                      disabled={saving}
                    >
                      <X size={14} className="mr-1" />
                      Cancel
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    {editBio.length}/500 characters
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Posts by {profile.name} ({posts.length})
        </h2>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
