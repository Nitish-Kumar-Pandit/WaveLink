import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE } from "..";
import appwriteService from "../../appwrite/config";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, useToast } from "../Toast";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
        category: post?.category || "general",
      },
    });

  const { toasts, addToast, removeToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "general", label: "General" },
    { value: "technology", label: "Technology" },
    { value: "design", label: "Design" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "business", label: "Business" },
    { value: "travel", label: "Travel" },
    { value: "food", label: "Food & Cooking" },
    { value: "health", label: "Health & Fitness" },
    { value: "education", label: "Education" },
    { value: "entertainment", label: "Entertainment" },
  ];

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Check user session on component mount
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        console.log("Current user session:", currentUser);
        if (!currentUser) {
          console.warn("No active user session found");
        }
      } catch (error) {
        console.error("Error checking user session:", error);
      }
    };

    if (userData?.$id) {
      checkUserSession();
    }
  }, [userData]);

  const submit = async (data) => {
    if (!userData?.$id) {
      addToast("Please log in to create a post", "error");
      navigate('/login');
      return;
    }

    // Validate required fields
    if (!data.title?.trim()) {
      addToast("Please enter a title for your post", "error");
      return;
    }

    if (!data.content?.trim()) {
      addToast("Please enter content for your post", "error");
      return;
    }

    if (!data.slug?.trim()) {
      addToast("Please enter a slug for your post", "error");
      return;
    }

    // Validate featured image is required for new posts
    if (!post && (!data.image || !data.image[0])) {
      addToast("Please select a featured image for your post", "error");
      return;
    }

    // Clean and validate content
    let cleanContent = data.content;

    // Remove base64 images from content (they make content too long)
    cleanContent = cleanContent.replace(/<img[^>]*src="data:image\/[^"]*"[^>]*>/gi, '');

    // Remove any remaining data URLs
    cleanContent = cleanContent.replace(/data:image\/[^;]*;base64,[^"'\s>]*/gi, '');

    // Validate content length (Appwrite limit is 65535 characters)
    if (cleanContent.length > 65000) {
      addToast("Content is too long. Please reduce the content size (maximum ~65,000 characters).", "error");
      return;
    }

    // Update data with cleaned content
    data.content = cleanContent;

    console.log("User data:", userData);
    console.log("Submitting post with data:", data);

    setIsSubmitting(true);

    try {
      const file = data.image?.[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (post) {
        // Updating existing post
        if (file) appwriteService.deleteFile(post.featuredImage);

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file?.$id || post.featuredImage,
        });

        if (dbPost) {
          addToast("Story updated successfully!", "success");
          // Small delay to show the toast before redirecting
          setTimeout(() => {
            window.scrollTo(0, 0);
            navigate('/all-posts');
          }, 1000);
        }
      } else {
        // Creating new post
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          featuredImage: file?.$id, // Featured image is now required for new posts
        });

        if (dbPost) {
          addToast("Story created successfully!", "success");
          // Small delay to show the toast before redirecting
          setTimeout(() => {
            window.scrollTo(0, 0);
            navigate('/all-posts');
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        type: error.type,
        response: error.response
      });

      // Handle specific error types
      if (error.code === 401 || error.message?.includes("unauthorized") || error.message?.includes("not authorized")) {
        addToast("Authentication error. Please log out and log in again.", "error");
        navigate('/login');
      } else if (error.code === 403) {
        addToast("You don't have permission to create posts. Please contact support.", "error");
      } else if (error.message?.includes("Invalid `documentId`")) {
        addToast("Invalid post title. Please use only letters, numbers, and basic punctuation.", "error");
      } else if (error.message?.includes("Document with the requested ID already exists")) {
        addToast("A post with this title already exists. Please use a different title.", "error");
      } else if (error.message?.includes("no longer than 65535 chars") || error.message?.includes("content") && error.message?.includes("invalid type")) {
        addToast("Content is too long or contains invalid data. Please reduce content size and avoid pasting images directly.", "error");
      } else if (error.message?.includes("Unknown attribute") || error.message?.includes("document_invalid_structure")) {
        addToast("Database schema issue detected. Please check your content format.", "error");
      } else if (error.message?.includes("network") || error.message?.includes("fetch")) {
        addToast("Network error. Please check your connection and try again.", "error");
      } else if (error.message?.includes("file") || error.message?.includes("upload")) {
        addToast("File upload error. Please try with a smaller image or different format.", "error");
      } else {
        addToast(`Error: ${error.message || "There was an error saving your post. Please try again."}`, "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (!value) return "";

    let slug = value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s-_.]/g, "") // Only allow valid characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/^[-_.]+|[-_.]+$/g, ""); // Remove leading/trailing special chars

    // Ensure slug doesn't start with special character
    if (slug.match(/^[^a-zA-Z0-9]/)) {
      slug = "post-" + slug;
    }

    // Limit to 36 characters maximum
    if (slug.length > 36) {
      slug = slug.substring(0, 36).replace(/[-_.]+$/, "");
    }

    // Ensure we have a valid slug
    if (!slug || slug.length === 0) {
      slug = "post-" + Date.now().toString().slice(-8);
    }

    return slug;
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // Reload the page if userData is not available
  useEffect(() => {
    if (!userData?.$id) {
      const timer = setTimeout(() => {
        window.location.reload(); // Force reload the page
      }, 2000); // Reload after 2 seconds

      return () => clearTimeout(timer); // Clear the timer if the component unmounts
    }
  }, [userData]);

  if (!userData?.$id) {
    return <div className="text-center text-gray-500">Loading...</div>; // Show a loading state if userData is not available
  }

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <form onSubmit={handleSubmit(submit)} className="flex justify-center flex-wrap gap-4 md:gap-8">
        {/* Main Content Section */}
        <div className="w-full lg:w-2/3">
          <div className="space-y-4 md:space-y-6">
            <Input
              label="Title"
              placeholder="Enter your story title..."
              className="mb-0 text-base md:text-sm"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug"
              placeholder="Auto-generated slug"
              className="mb-0 text-base md:text-sm"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            <div>
              <RTE
                label="Content"
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
              <div className="mt-2 text-xs text-gray-600 pl-1">
                <span className="font-medium">Note:</span> Content limit is ~65,000 characters.
                Avoid pasting images directly - use the featured image field instead.
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 rounded-2xl p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Featured Image Upload */}
            <div>
              <label className="inline-block mb-2 pl-1 text-sm font-medium text-gray-900">
                Featured Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image", {
                  required: !post ? "Featured image is required" : false
                })}
                className="w-full px-4 py-3 md:py-2 rounded-lg bg-white text-gray-900 outline-none
                  focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                  duration-200 border-2 border-gray-200 shadow-sm text-base md:text-sm
                  hover:border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg
                  file:border-0 file:text-sm file:font-medium file:bg-orange-50
                  file:text-orange-700 hover:file:bg-orange-100 file:cursor-pointer"
              />
              {!post && (
                <p className="text-xs text-gray-600 mt-1 pl-1">
                  Upload a featured image for your post (JPG, PNG, GIF)
                </p>
              )}
              {post && post.featuredImage && (
                <div className="mt-2">
                  <p className="text-xs text-gray-600 pl-1">Current image will be kept if no new image is selected</p>
                </div>
              )}
            </div>

            {/* Category field temporarily hidden due to database schema limitations */}
            {false && (
              <div>
                <label className="inline-block mb-1 pl-1 text-sm font-medium text-gray-900">
                  Category
                </label>
                <select
                  {...register("category", { required: false })}
                  className="px-4 py-3 md:py-2 rounded-lg bg-white text-gray-900 outline-none
                    focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                    duration-200 border-2 border-gray-200 w-full shadow-sm text-base md:text-sm
                    hover:border-gray-300 font-medium tracking-wide"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value} className="text-gray-900 bg-white">
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              bgColor={post ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600"}
              className={`w-full text-white rounded-lg py-3 font-semibold tracking-wide text-sm transform hover:scale-105 transition-all duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{post ? "UPDATING..." : "CREATING..."}</span>
                </div>
              ) : (
                post ? "UPDATE STORY" : "CREATE STORY"
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
