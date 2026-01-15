import { DocumentUri, TextDocumentIdentifier } from "../../documents";
import { RequestMessage } from "../../server";
import { Range } from "../../type";
import { Diagnostic } from "./diagnostic";

interface CodeActionContext {
  diagnostics: Diagnostic[];
}

interface CodeActionParams {
  textDocument: TextDocumentIdentifier;
  range: Range;
  context: CodeActionContext;
}

interface TextEdit {
  range: Range;
  newText: string;
}

interface WorkspaceEdit {
  changes: { [uri: DocumentUri]: TextEdit[] };
}

interface CodeAction {
  title: string;
  kind: "quickfix";
  edit: WorkspaceEdit;
  data?: unknown;
}

export const codeAction = (message: RequestMessage): CodeAction[] | null => {
  const params = message.params as CodeActionParams;
  const diagnostics = params.context.diagnostics;

  return diagnostics.flatMap((diagnostic): CodeAction[] => {
    const wordSuggestions = diagnostic.data?.wordSuggestions;
    if (!wordSuggestions || diagnostic.data?.type !== "spelling-suggestion") {
      return [];
    }
    return wordSuggestions.map((wordSuggestion): CodeAction => {
      const codeAction: CodeAction = {
        title: `Replace with ${wordSuggestion}`,
        kind: "quickfix",
        edit: {
          changes: {
            [params.textDocument.uri]: [
              {
                range: diagnostic.range,
                newText: wordSuggestion,
              },
            ],
          },
        },
      };
      return codeAction;
    });
  });
};