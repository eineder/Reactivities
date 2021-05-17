import { observer } from 'mobx-react-lite';
import { Modal, ModalContent } from 'semantic-ui-react';
import { useStore } from '../../stores/Store';

export default observer(function ModalContainer() {
  const { modalStore } = useStore();

  return (
    <Modal
      open={modalStore.modal.open}
      onClose={modalStore.closeModal}
      size="mini"
    >
      <ModalContent>{modalStore.modal.body}</ModalContent>
    </Modal>
  );
});
