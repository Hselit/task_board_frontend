"use client";

export default function Navbar({ title, status, activeUsers }: NavbarProps) {
  const config = statusConfig[status];

  return (
    <nav className="w-full border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>

        <div className="flex items-center gap-4">
          <div className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
            👥 {activeUsers} Active {activeUsers === 1 ? "User" : "Users"}
          </div>

          <div className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${config.box}`}>
            <span className={`h-2.5 w-2.5 rounded-full ${config.dot}`} />
            {config.text}
          </div>
        </div>
      </div>
    </nav>
  );
}

type Status = "online" | "connecting" | "offline";

type NavbarProps = {
  title: string;
  status: Status;
  activeUsers: number;
};

const statusConfig = {
  online: {
    dot: "bg-green-500",
    text: "Server Online",
    box: "border-green-300 bg-green-50 text-green-700",
  },
  connecting: {
    dot: "bg-orange-500",
    text: "Connecting...",
    box: "border-orange-300 bg-orange-50 text-orange-700",
  },
  offline: {
    dot: "bg-red-500",
    text: "Server Offline",
    box: "border-red-300 bg-red-50 text-red-700",
  },
};
