import openai
import json
import os

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def summarize_transcript(transcript: str) -> dict:
    """Send transcript to GPT and return structured summary"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """You are a professional meeting assistant.
                Given a meeting transcript, return ONLY a JSON object with:
                - summary: 3-5 sentence overview
                - key_points: list of 3-7 bullet points
                - action_items: list of tasks, each with 'task' and 'owner'"""
            },
            {
                "role": "user",
                "content": transcript
            }
        ],
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)