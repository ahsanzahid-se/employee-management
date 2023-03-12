import { useEmployeeStore } from "@/stores/employee";

export const uploadImage = async (key: string, file: File) => {
  const employeeStore = useEmployeeStore();
  const { getUploadURL } = employeeStore;

  try {
    const { error, result } = await getUploadURL(`${key}`);

    if (error) {
      throw error;
    }

    await fetch(result!, {
      method: "PUT",
      body: file,
    });

    return result;
  } catch (err) {
    throw new Error("Error while uploading image!");
  }
};
