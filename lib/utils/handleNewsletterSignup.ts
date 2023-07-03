import { useCallback } from 'react';
import axios from 'axios';

type DispatchAction = React.Dispatch<React.SetStateAction<boolean>>;

function useFormSubmit(setModalOpen:DispatchAction, setLoading:DispatchAction) {
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(true);
    setLoading(true);
    const form = e.target as HTMLFormElement;
    //@ts-ignore
    const email: string = form.children[0].children[1].value || form.children[0].value

    try {
      const response = await axios.post("/api/newsletter", { email });
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

    //@ts-ignore
    e.target.reset();
  }, [setModalOpen, setLoading]);

  return handleSubmit;
}

export default useFormSubmit;