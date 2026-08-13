import { createFileRoute } from "@tanstack/react-router";
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { addOutline, closeOutline, globeOutline } from "ionicons/icons";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminInstitutionList } from "@/components/admin/AdminInstitutionList";
import { AdminInstitutionDetails } from "@/components/admin/AdminInstitutionDetails";
import { AdminRecentUpdates } from "@/components/admin/AdminRecentUpdates";
import { InstitutionForm } from "@/components/admin/InstitutionForm";
import { useAdminStats, useAuditEntries, useInstitutions } from "@/hooks/use-institutions";
import {
  createInstitution,
  deleteInstitution,
  saveInstitutionProfile,
  updateInstitutionStatus,
} from "@/lib/institutions-service";
import type { AvailabilityStatus, Institution, NewInstitutionInput } from "@/types/institution";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel administrativo | AcolhePOA" },
      {
        name: "description",
        content:
          "Painel administrativo demonstrativo do AcolhePOA: cadastro, edição, exclusão e situação de vagas das instituições.",
      },
      { property: "og:title", content: "Painel administrativo | AcolhePOA" },
      {
        property: "og:description",
        content: "Administração demonstrativa das instituições de acolhimento de Porto Alegre.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  ssr: false,
  component: AdminPage,
});

/**
 * Painel do administrador do sistema (modo demonstração).
 * Toda alteração passa pelo serviço central `institutions-service`, de modo que
 * a área pública reflete imediatamente os mesmos dados.
 *
 * Acesso: nesta etapa não há autenticação. Quando o backend existir, o acesso
 * deve ser restrito ao papel ADMIN e validado no servidor, nunca só na UI.
 */
function AdminPage() {
  const navigate = useNavigate();
  const institutions = useInstitutions();
  const stats = useAdminStats();
  const audit = useAuditEntries(8);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Institution | null>(null);
  const [viewing, setViewing] = useState<Institution | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Institution | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(institution: Institution) {
    setEditing(institution);
    setViewing(null);
    setFormOpen(true);
  }

  function handleSubmit(data: NewInstitutionInput) {
    if (editing) {
      saveInstitutionProfile(
        { ...data, institutionId: editing.institutionId },
        "Administração do sistema",
        "ADMIN",
      );
      setToast("Instituição atualizada com sucesso.");
    } else {
      createInstitution(data);
      setToast("Instituição cadastrada com sucesso.");
    }
    setFormOpen(false);
    setEditing(null);
  }

  function handleStatusChange(institution: Institution, status: AvailabilityStatus) {
    const updated = updateInstitutionStatus({ institutionId: institution.institutionId, status });
    if (updated && viewing?.institutionId === updated.institutionId) setViewing(updated);
    setToast("Situação atualizada com sucesso.");
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    deleteInstitution(pendingDelete.institutionId);
    if (viewing?.institutionId === pendingDelete.institutionId) setViewing(null);
    setPendingDelete(null);
    setToast("Instituição excluída.");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Painel Administrativo</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => navigate({ to: "/" })} aria-label="Ver app público">
              <IonIcon slot="icon-only" icon={globeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="admin-wrap">
          <header className="admin-intro">
            <h1>Painel Administrativo — modo demonstração</h1>
            <p>
              Administração de todas as instituições cadastradas. Os dados apresentados nesta versão
              são demonstrativos.
            </p>
            <IonButton onClick={openCreate}>
              <IonIcon slot="start" icon={addOutline} aria-hidden="true" />
              Nova instituição
            </IonButton>
          </header>

          <AdminStats stats={stats} />

          <AdminInstitutionList
            institutions={institutions}
            onView={setViewing}
            onEdit={openEdit}
            onDelete={setPendingDelete}
            onStatusChange={handleStatusChange}
          />

          <AdminRecentUpdates entries={audit} />
        </div>

        <IonModal isOpen={formOpen} onDidDismiss={() => setFormOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{editing ? "Editar instituição" : "Nova instituição"}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setFormOpen(false)} aria-label="Fechar">
                  <IonIcon slot="icon-only" icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <InstitutionForm
              institution={editing ?? undefined}
              onSubmit={handleSubmit}
              onCancel={() => setFormOpen(false)}
            />
          </IonContent>
        </IonModal>

        <IonModal isOpen={viewing !== null} onDidDismiss={() => setViewing(null)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Detalhes administrativos</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setViewing(null)} aria-label="Fechar">
                  <IonIcon slot="icon-only" icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {viewing ? (
              <AdminInstitutionDetails
                institution={viewing}
                onEdit={() => openEdit(viewing)}
                onDelete={() => setPendingDelete(viewing)}
                onStatusChange={(status) => handleStatusChange(viewing, status)}
              />
            ) : null}
          </IonContent>
        </IonModal>

        <IonAlert
          isOpen={pendingDelete !== null}
          header="Excluir instituição"
          message="Tem certeza que deseja excluir esta instituição?"
          onDidDismiss={() => setPendingDelete(null)}
          buttons={[
            { text: "Cancelar", role: "cancel" },
            { text: "Excluir", role: "destructive", handler: confirmDelete },
          ]}
        />

        <IonToast
          isOpen={toast !== null}
          message={toast ?? ""}
          duration={2200}
          onDidDismiss={() => setToast(null)}
        />
      </IonContent>
    </IonPage>
  );
}