import { ISession } from "src/shared/types/types";

export interface IAddSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (session: ISession) => void;
}
