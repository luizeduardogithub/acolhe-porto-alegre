import { createFileRoute } from "@tanstack/react-router";
import {
  IonContent,
  IonPage,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonText,
} from "@ionic/react";
import { useMemo, useState } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { shieldCheckmarkOutline } from "ionicons/icons";
import { useNavigate } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { InstitutionCard } from "@/components/InstitutionCard";
import { InstallPwaButton } from "@/components/InstallPwaButton";
import { useInstitutions } from "@/hooks/use-institutions";
import { normalize } from "@/lib/format";
import type { AvailabilityStatus } from "@/types/institution";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AcolhePOA | Locais de acolhimento em Porto Alegre" },
      {
        name: "description",
        content:
          "Consulte locais de acolhimento em Porto Alegre e veja a situação de vagas informada por cada unidade. Protótipo com dados demonstrativos.",
      },
      { property: "og:title", content: "AcolhePOA | Locais de acolhimento em Porto Alegre" },
      {
        property: "og:description",
        content:
          "Busque por nome ou bairro e veja a situação informada por cada local de acolhimento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

type Filter = "ALL" | AvailabilityStatus;

function HomePage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("ALL");
  const all = useInstitutions();
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = normalize(query.trim());
    return all.filter((item) => {
      const matchesStatus = filter === "ALL" || item.status === filter;
      const matchesQuery =
        q.length === 0 ||
        normalize(item.name).includes(q) ||
        normalize(item.neighborhood).includes(q) ||
        normalize(item.address ?? "").includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [all, query, filter]);

  return (
    <IonPage>
      <AppHeader title="AcolhePOA" showAbout showLogin />
      <IonContent>
        <section className="intro">
          <h1>AcolhePOA</h1>
          <p className="subtitle">Encontre locais de acolhimento em Porto Alegre</p>
          <p className="intro-text">
            Consulte informações sobre locais de acolhimento e verifique a situação informada por
            cada unidade.
          </p>
        </section>

        <IonSearchbar
          value={query}
          onIonInput={(e) => setQuery(e.detail.value ?? "")}
          placeholder="Buscar por nome ou bairro"
          inputmode="search"
          aria-label="Buscar por nome ou bairro"
        />

        <div className="segment-wrap">
          <IonSegment
            scrollable
            value={filter}
            onIonChange={(e) => setFilter((e.detail.value as Filter) ?? "ALL")}
          >
            <IonSegmentButton value="ALL">
              <IonLabel>Todos</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="AVAILABLE">
              <IonLabel>Com vagas</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="FULL">
              <IonLabel>Sem vagas</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="UNKNOWN">
              <IonLabel>Não informado</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        {results.length === 0 ? (
          <IonText>
            <p className="empty">Nenhum local encontrado com esses critérios.</p>
          </IonText>
        ) : (
          results.map((institution) => (
            <InstitutionCard key={institution.institutionId} institution={institution} />
          ))
        )}

        <DisclaimerNote />
        <InstallPwaButton />
        <IonButton
          expand="block"
          fill="clear"
          size="small"
          color="medium"
          className="admin-link"
          onClick={() => navigate({ to: "/admin" })}
        >
          <IonIcon slot="start" icon={shieldCheckmarkOutline} aria-hidden="true" />
          Painel administrativo
        </IonButton>
      </IonContent>
    </IonPage>
  );
}
