import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, User } from "lucide-react";

const RoleSelectionDialog = ({ open, onOpenChange, onRoleSelect }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent style={{ width: "28rem" }}>
        <DialogHeader className="">
          <DialogTitle >
            Select Your Role
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Choose your role before continuing with Google authentication.
          </DialogDescription>
        </DialogHeader>
        <div className=" py-6">
          <Button
            variant="outline"
            className="flex flex-col items-center"
            onClick={() => onRoleSelect("user")}
          >
            <User className="h-10 w-10 text-primary mb-3" />
            <span className="text-lg font-semibold">Group User</span>
            <span className="text-sm text-gray-500 mt-2 text-center">
              Join existing groups and participate in tournaments.
            </span>
          </Button>

          
        </div>

        <div className="flex-col py-6">
          <Button
            variant="outline"
            className="flex flex-col "
            onClick={() => onRoleSelect("leader")}
          >
            <Users className="" />
            <span className="text-lg font-semibold">Group Leader</span>
            <span className="text-sm text-gray-500 mt-2 text-center">
              Create and manage your own groups and tournaments.
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSelectionDialog;
