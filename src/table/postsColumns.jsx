export function getPostsColumns({ onEdit, onDelete }) {
  return [
    {
      accessorKey: "id",
      header: "ID",
      enableSorting: true,
    },
    {
      accessorKey: "title",
      header: "Title",
      enableSorting: true,
    },
    {
      accessorKey: "author",
      header: "Author",
      enableSorting: true,
    },
    {
      accessorKey: "body",
      header: "Body",
      enableSorting: false,
      cell: (info) => {
        const v = info.getValue();
        if (typeof v !== "string") return "";
        return v.length > 80 ? `${v.slice(0, 80)}…` : v;
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const post = row.original;
        return (
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button className="btn btn-secondary" onClick={() => onEdit(post)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(post)}>
              Delete
            </button>
          </div>
        );
      },
    },
  ];
}
