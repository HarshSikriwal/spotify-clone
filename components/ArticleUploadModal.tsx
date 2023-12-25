import React, { useState } from "react";
import Modal from "./Modal";
import useArticleUploadModal from "@/hooks/useArticleUploadModal";
import Input from "./Input";
import Button from "./Button";

import getArticleDetails from "@/actions/getArticleDetails";

const ArticleUploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useArticleUploadModal();
  const [url, setUrl] = useState<string>("");
  const [text, setText] = useState<string | null>(null);
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  const handleUpload = async () => {
    setIsLoading(true);
    const transcribed = await getArticleDetails(url);
    setText(transcribed);
    setIsLoading(false);
  };
  console.log(text);
  return (
    <Modal
      title="Add an Article link"
      description="Add any article whose audio you needed"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <Input
          placeholder="Enter a valid link"
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button disabled={isLoading} type="submit">
          Generate Audio
        </Button>
      </form>
    </Modal>
  );
};

export default ArticleUploadModal;
