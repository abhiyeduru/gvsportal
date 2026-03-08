import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAuth } from "@/services/userServices";
import { toast } from "sonner";

const UpdateUserRole = () => {
  const queryClient = useQueryClient();

  const updateRoleMutation = useMutation({
    mutationFn: (roleData) => updateUserAuth(roleData),
    onSuccess: (data) => {
      toast.success("User role updated successfully!");
      queryClient.invalidateQueries(["current-user"]);
      console.log("Role updated:", data);
    },
    onError: (error) => {
      toast.error("Failed to update user role");
      console.error("Error updating role:", error);
    }
  });

  const handleUpdateToParent = () => {
    updateRoleMutation.mutate({ role: "parent" });
  };

  const handleUpdateToTeacher = () => {
    updateRoleMutation.mutate({ role: "jobSeeker" });
  };

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50">
      <h3 className="text-sm font-semibold mb-2">Update User Role (Dev Tool)</h3>
      <div className="space-y-2">
        <button
          onClick={handleUpdateToParent}
          disabled={updateRoleMutation.isLoading}
          className="w-full px-3 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 disabled:opacity-50"
        >
          {updateRoleMutation.isLoading ? "Updating..." : "Set Role to Parent"}
        </button>
        <button
          onClick={handleUpdateToTeacher}
          disabled={updateRoleMutation.isLoading}
          className="w-full px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {updateRoleMutation.isLoading ? "Updating..." : "Set Role to Teacher"}
        </button>
      </div>
    </div>
  );
};

export default UpdateUserRole;