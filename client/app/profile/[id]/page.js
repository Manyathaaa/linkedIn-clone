"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import PostCard from "@/components/PostCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, User } from "lucide-react";
import apiClient from "@/lib/axios";

export default function ProfilePage({ params }) {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const router = useRouter();
  const userId = params.id;

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await apiClient.get(`/user/${userId}`);
        setProfile(response.data.user);
      } catch (err) {
        setError("Failed to load profile");
        console.error(err);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await apiClient.get(`/user/${userId}/posts`);
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchUserPosts();
  }, [user, userId, router]);

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

        {profile.bio && (
          <CardContent>
            <div className="flex items-start space-x-2">
              <User size={16} className="mt-1 text-gray-500" />
              <p className="text-gray-700">{profile.bio}</p>
            </div>
          </CardContent>
        )}
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
