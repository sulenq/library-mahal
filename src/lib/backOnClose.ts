export default function backOnClose(onClose: () => void) {
  onClose();
  window.history.back();
}
