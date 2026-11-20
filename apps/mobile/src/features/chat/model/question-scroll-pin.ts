import type { QuestionPromptController } from "@/features/chat/components/use-question-prompt";
import type { ChatMessage } from "@/features/chat/model/chat-messages";
import { vaultRequestOf } from "@/features/chat/model/vault-request";

/**
 * While an open form waits in the transcript, `maintainScrollAtEnd` can keep its row at the bottom of
 * the screen when the agent keeps writing. Private answers and Vault requests belong in the history
 * like other messages; only forms that use the composer pin the end.
 */
export function questionScrollPinId(
  controller: QuestionPromptController | undefined,
  messages: readonly ChatMessage[],
): string | null {
  if (!controller?.question) return null;
  if (controller.question.isSecret) return null;
  const row = messages.find((message) => message.id === controller.messageId && message.kind === "question");
  if (row?.kind === "question" && vaultRequestOf(row.uiBlock)) return null;
  return controller.messageId ?? null;
}
