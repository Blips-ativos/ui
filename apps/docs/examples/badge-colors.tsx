import { Badge } from "@blips/ui/components/badge";

export default function BadgeCustomColors() {
  return (
    <div className="flex max-w-md flex-wrap gap-2">
      <Badge className="bg-blue-600 text-blue-50 dark:bg-blue-600 dark:text-blue-50">
        Azul
      </Badge>
      <Badge className="bg-green-600 text-green-50 dark:bg-green-600 dark:text-green-50">
        Verde
      </Badge>
      <Badge className="bg-purple-600 text-purple-50 dark:bg-purple-600 dark:text-purple-50">
        Roxo
      </Badge>
      <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
        Azul
      </Badge>
      <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
        Verde
      </Badge>
      <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
        Céu
      </Badge>
      <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
        Roxo
      </Badge>
      <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
        Vermelho
      </Badge>
    </div>
  );
}
