import { useEffect, useState } from "react";

const empty = { title: "", author: "", body: "" };

export default function PostForm({ initialValues, onSubmit, onCancel, busy }) {
  const [values, setValues] = useState(empty);

  useEffect(() => {
    setValues(initialValues ?? empty);
  }, [initialValues]);

  function update(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  function submit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={submit} className="form">
      <label className="field">
        <span className="label">Title</span>
        <input
          className="input"
          value={values.title}
          onChange={update("title")}
          required
        />
      </label>

      <label className="field">
        <span className="label">Author</span>
        <input
          className="input"
          value={values.author}
          onChange={update("author")}
          required
        />
      </label>

      <label className="field">
        <span className="label">Body</span>
        <textarea
          className="input"
          value={values.body}
          onChange={update("body")}
          rows={4}
          required
        />
      </label>

      <div className="formActions">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={onCancel}
          disabled={busy}
        >
          Cancel
        </button>
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
