"use client";

import { useAllTechnicians } from "@/app/features/admin/api/use-all-technicians";
import { Loader } from "lucide-react";
import { DataTable } from "../component/table/data-table";
import { TechnicianColumns } from "../component/table/columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAllUsers } from "@/app/features/admin/api/use-all-users";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skill } from "@/app/features/types";




const TechniciansDashboard = () => {
  const { technicians, isTechniciansLoading } = useAllTechnicians();
  const { users, isUsersLoading } = useAllUsers();

  const createTechnicians = useMutation(api.technicians.createTechnician);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState("");
  const [skills, setSkills] = useState<Skill | undefined>();
  const [location, setLocation] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [jobCount, setJobCount] = useState(0);

  const handleSubmit = async () => {
    if (!selectedUserId) return alert("Please select a user");

    await createTechnicians({
      userId: selectedUserId as any,
      skills: skills,
      location,
      isActive,
      jobCount: jobCount,
    });

    // Reset form
    setSelectedUserId("");
    setSkills(undefined);
    setLocation("");
    setIsActive(true);
    setJobCount(0);
    setDialogOpen(false);
  };

  if (isTechniciansLoading) {
    return (
      <div className="flex flex-col h-full gap-y-4 items-center justify-center">
        <p className="text-lg font-bold">Loading</p>
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const handleCreateTechnicians = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={TechnicianColumns}
        data={technicians}
        showCreateButton={true}
        onCreateClick={handleCreateTechnicians}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Technician</DialogTitle>
            <DialogDescription>
              Assign an existing user as a technician and fill in their info.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-1">
              <label className="pl-2 text-sm">Select a User</label>
              <Select
                value={selectedUserId}
                onValueChange={(value) => setSelectedUserId(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a User" />
                </SelectTrigger>
                <SelectContent>
                  {users
                    ?.filter((user) => user.role === "user")
                    .map((user) => (
                      <SelectItem key={user._id} value={user._id}>
                        {user.name} - {user.email}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 py-4">
              <div className="space-y-1">
                <label className="pl-2 text-sm">Select a Skill</label>
                <Select
                  value={skills}
                  onValueChange={(value: Skill) => setSkills(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Skill" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plumber">Plumber</SelectItem>
                    <SelectItem value="electrician">Electrician</SelectItem>
                    <SelectItem value="cleaner">Cleaner</SelectItem>
                    <SelectItem value="appliance repair">
                      Appliance Repair
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="pl-2 text-sm">Location</label>
              <Input
                placeholder="e.g. Phnom Penh"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label className="pl-2 text-sm">Is Active ?</label>

              <Switch
                id="is-active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>

            <div className="space-y-1">
              <label className="pl-2 text-sm">Job Count (optional)</label>
              <Input
                min={0}
                type="number"
                placeholder="e.g. 10"
                value={jobCount}
                onChange={(e) => setJobCount(Number(e.target.value))}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TechniciansDashboard;
