import { CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import React from "react";
import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberPhotosByUserId } from "@/app/actions/memberAction";
import StarButton from "@/components/StarButton";
import DeleteButton from "@/components/DeleteButton";
import ImageUploadbutton from "@/components/ImageUploadbutton";
import MemberPhotoUpload from "./MemberPhotoUpload";

export default async function PhotosPage() {
  const userId = await getAuthUserId();
  const photos = await getMemberPhotosByUserId(userId);
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotoUpload />
        <div className="grid grid-col-5 gap-3 p-5">
          {photos &&
            photos.map((photo) => (
              <div key={photo.id} className="relative w-56">
                <Image
                  width={220}
                  height={220}
                  src={photo.url}
                  alt="Image of user"
                />
                <div className="absolute top-3 left-3 z-50">
                  <StarButton selected={true} loading={false} />
                </div>
                <div className="absolute top-3 right-3 z-50">
                  <DeleteButton loading={false} />
                </div>
              </div>
            ))}
        </div>
      </CardBody>
    </>
  );
}
