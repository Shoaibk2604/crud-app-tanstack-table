import Modal from "./Modal";

export default function ConfirmDialog({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  busy,
}) {
  return (
    <Modal title={title} onClose={onCancel}>
      <div style={{ display: "grid", gap: 16 }}>
        <p style={{ margin: 0 }}>{message}</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={busy}
          >
            {cancelText}
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? "Working…" : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
