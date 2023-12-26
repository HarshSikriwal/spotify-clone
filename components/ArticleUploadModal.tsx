import React, { useState } from "react";
import Modal from "./Modal";
import useArticleUploadModal from "@/hooks/useArticleUploadModal";
import Input from "./Input";
import Button from "./Button";
import uniqid from "uniqid";
import getArticleDetails, { generateAudio } from "@/actions/getArticleDetails";
import toast from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

const ArticleUploadModal = () => {
  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useArticleUploadModal();
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string | null>(null);
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  const handleUpload = async () => {
    if (!user) return;
    setIsLoading(true);
    const { title, text } = await getArticleDetails(url);
    const blob = await generateAudio(text);
    if (blob instanceof Error) {
      toast.error(blob.message);
      setIsLoading(false);
      return;
    }
    if (blob === undefined) {
      toast.error("Something went wrong");
      setIsLoading(false);
      return;
    }
    setTitle(title!);
    const uniqueID = uniqid();
    const audioFile = new File([blob], `${uniqueID}.mp3`, {
      type: "audio/mpeg",
    });

    const { error: AudioError } = await supabaseClient.storage
      .from("songs")
      .upload(`${uniqueID}.mp3`, audioFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (AudioError) {
      toast.error(AudioError.message);
      setIsLoading(false);
      return;
    }

    const { publicUrl } = supabaseClient.storage
      .from("songs")
      .getPublicUrl(`${uniqueID}.mp3`).data;

    const { error: tableError } = await supabaseClient.from("articles").insert({
      user_id: user.id,
      title,
      audio_path: publicUrl,
      url,
    });
    if (tableError) {
      setIsLoading(false);
      return toast.error(tableError.message);
    }
    router.refresh();
    setIsLoading(false);
    toast.success("Audio Genereated");
    onClose();
  };
  return (
    <Modal
      title="Add an Article link"
      description="Add a link to any article on the web to listen using AI generated voice"
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Enter a valid link"
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button disabled={isLoading} onClick={handleUpload}>
          Generate Audio
        </Button>
      </div>
    </Modal>
  );
};

export default ArticleUploadModal;
