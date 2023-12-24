import React, { useState } from "react";
import Modal from "./Modal";
import useArticleUploadModal from "@/hooks/useArticleUploadModal";
import Input from "./Input";
import Button from "./Button";

const ArticleUploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { onOpen, isOpen, onClose } = useArticleUploadModal();
  const onChange = (open: boolean) => {
    if (!open) {
      //   reset();
      onClose();
    }
  };
  const handleUpload = async () => {};

  return (
    <Modal
      title="Add an Article link"
      description="Add any article whose audio you needed"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <Input placeholder="Enter a valid link" />
        <Button disabled={isLoading} type="submit">
          Generate Audio
        </Button>
      </form>
    </Modal>
  );
};

export default ArticleUploadModal;
