type ChatProps = {
  userId: string;
};

export default function Chat({ userId }: ChatProps) {
  return (
    <div>
      {/* Qui va la logica vera */}
      Chat per User ID: {userId}
    </div>
  );
}
