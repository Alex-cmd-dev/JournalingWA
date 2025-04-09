from transformers import pipeline
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("API_KEY"))

classifier = pipeline(
    "sentiment-analysis", model="michellejieli/emotion_text_classifier"
)


def analyze_mood(text):
    """
    Analyze the mood of the given text using a pre-trained model.
    """
    # Use the classifier to get the mood
    result = classifier(text)
    # Extract the mood from the result
    mood = result[0]["label"]
    # Return the mood
    return mood


def analyze_content(text, mood):
    """
    Analyze the content of the text using Google GenAI.
    """
    try:
        prompt = (
            "You are a compassionate and empathetic AI counselor designed to help users process their journal entries. "
            "Your goal is to provide supportive and reflective feedback, similar to a therapist, but without offering medical diagnoses or prescribing treatment."
            "Do not provide medical or psychological diagnoses. If a user expresses severe distress or mentions self-harm, gently advise them to seek professional help."
            "Do not give direct advice, rather ask questions that lead the user to their own conclusions."
            f"Here is the user's journal entry: [User's Journal Entry: {text}]"
            f"User's mood: {mood}"
            "Provide reflective questions to help the user explore their thoughts and feelings. Summarize the key themes and emotions expressed in the journal entry. Offer gentle affirmations and encouragement. Maintain a calm, supportive, and empathetic tone."
            "Use open-ended questions to encourage deeper reflection. Avoid jargon or technical terms. Format your response in a conversational style."
        )
        try:
            response = client.models.generate_content(
                model="gemini-2.0-flash", contents=prompt
            )
            return response.text
        except Exception as api_error:
            raise ValueError(f"Gemini API call failed: {api_error}")

        

    except Exception as e:
        raise ValueError(f"Failed to analyze entry: {str(e)}")
