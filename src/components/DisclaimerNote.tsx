import { IonIcon, IonText } from "@ionic/react";
import { alertCircleOutline } from "ionicons/icons";

export function DisclaimerNote() {
  return (
    <div className="disclaimer" role="note">
      <IonIcon icon={alertCircleOutline} aria-hidden="true" />
      <IonText>
        <p>
          <strong>Importante:</strong> a disponibilidade de vagas pode mudar a qualquer momento. As
          informações exibidas dependem da atualização realizada pela instituição e não garantem uma
          vaga ou acolhimento.
        </p>
        <p>
          Algumas unidades possuem critérios próprios de acesso ou podem exigir encaminhamento. Esta
          versão utiliza <strong>dados demonstrativos</strong>, que não representam a situação real
          ou em tempo real das unidades.
        </p>
      </IonText>
    </div>
  );
}