from transformers import pipeline
from google import genai

classifier = pipeline("sentiment-analysis", model="michellejieli/emotion_text_classifier")

def analyze_mood(text):
    """
    Analyze the mood of the given text using a pre-trained model.
    """
    # Use the classifier to get the mood
    result = classifier(text)
    # Extract the mood from the result
    mood = result[0]['label']
    # Return the mood
    return mood