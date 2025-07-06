import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (!userData?.$id) {
      console.error(
        "User data is not available! Please check the Redux store."
      );
      return; // Prevent further execution if userData is missing
    }

    const file = data.image?.[0]
      ? await appwriteService.uploadFile(data.image[0])
      : null;

    if (post) {
      if (file) appwriteService.deleteFile(post.featuredImage);

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file?.$id || post.featuredImage,
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      if (file) {
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          featuredImage: file.$id,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    return value
      ? value
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-")
      : "";
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
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-4">
      {/* Main Content Section */}
      <div className="w-full lg:w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Enter the title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Auto-generated slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Sidebar Section */}
      <div className="w-full lg:w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full rounded-lg object-cover"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-blue-500"}
          className="w-full text-white rounded-lg py-2">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
