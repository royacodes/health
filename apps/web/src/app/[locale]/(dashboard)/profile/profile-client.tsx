"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@/lib/auth";
import { Button } from "@healthy/ui";
import { useTranslations } from "next-intl";

export function ProfileClient() {
  const t = useTranslations("profile");
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <div className="space-y-6 pb-24">
      <h1 className="text-2xl font-bold tracking-tight text-fg">{t("title")}</h1>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.image || undefined} alt={user?.name || ""} />
              <AvatarFallback className="text-xl">{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <h2 className="text-xl font-semibold text-fg">{user?.name || "User"}</h2>
              <p className="text-sm text-fg-muted">{user?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("editProfile")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline">{t("editProfile")}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
