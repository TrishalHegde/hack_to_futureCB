import json
import os
from sentence_transformers import SentenceTransformer, util
import torch

class SimilarityEngine:
    def __init__(self, model_name='all-MiniLM-L6-v2'):
        # Initialize the model
        self.model = SentenceTransformer(model_name)
        self.datasets = {}

    def load_dataset(self, name, file_path):
        """Loads a dataset from a JSON file."""
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                # We expect data to be a list of dicts with at least 'text' field
                self.datasets[name] = data
                # Pre-calculate embeddings for faster matching
                texts = [item['text'] for item in data]
                if texts:
                    embeddings = self.model.encode(texts, convert_to_tensor=True)
                    self.datasets[f"{name}_embeddings"] = embeddings
        else:
            print(f"Warning: Dataset file {file_path} not found.")

    def find_matches(self, query_text, dataset_name, top_k=3, threshold=0.4):
        """Finds the most similar entries in a dataset."""
        if dataset_name not in self.datasets or f"{dataset_name}_embeddings" not in self.datasets:
            return []

        query_embedding = self.model.encode(query_text, convert_to_tensor=True)
        dataset_embeddings = self.datasets[f"{dataset_name}_embeddings"]
        
        # Compute cosine similarity
        cos_scores = util.cos_sim(query_embedding, dataset_embeddings)[0]
        
        # Get top k results
        top_results = torch.topk(cos_scores, k=min(top_k, len(cos_scores)))
        
        matches = []
        for score, idx in zip(top_results[0], top_results[1]):
            score_val = score.item()
            if score_val >= threshold:
                item = self.datasets[dataset_name][idx.item()].copy()
                item['similarity_score'] = score_val
                matches.append(item)
        
        return matches

# Singleton instance
engine = SimilarityEngine()
