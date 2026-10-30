import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@blips/ui/components/avatar";

export default function AvatarWithBadge() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Avatar>
        <AvatarImage
          src="https://github.com/jorgezreik.png"
          alt="@jorgezreik"
        />
        <AvatarFallback>JZ</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
      </Avatar>
    </div>
  );
}
