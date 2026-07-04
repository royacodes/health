"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut, useSession } from "@/lib/auth";
import { Button } from "@healthy/ui";
import { useTranslations } from "next-intl";

export function SessionsClient() {
  const t = useTranslations("auth.sessions");
  const { data: session } = useSession();

  async function handleRevokeAll() {
    await signOut();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t("currentSession")}</CardTitle>
        </CardHeader>
        <CardContent>
          {session?.session ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {session.session.userAgent || "Unknown device"}
              </p>
              {session.session.ipAddress && (
                <p className="text-sm text-muted-foreground">IP: {session.session.ipAddress}</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No active session</p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="destructive" onClick={handleRevokeAll}>
          {t("revokeAll")}
        </Button>
      </div>
    </div>
  );
}
