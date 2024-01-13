import { getAICompletions } from "@/utils";

export async function POST(req: Request) {
  const { word } = await req.json();
  const res = await getAICompletions("syn", word);
  return Response.json({ res: res });
}
