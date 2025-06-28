import httpx
from typing import List

class CatAPIService:
    BASE_URL = "https://api.thecatapi.com/v1"
    
    @staticmethod
    async def get_breeds() -> List[str]:
        """Get all available cat breeds from TheCatAPI"""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(f"{CatAPIService.BASE_URL}/breeds")
                response.raise_for_status()
                breeds_data = response.json()
                return [breed["name"] for breed in breeds_data]
            except httpx.HTTPError:
                # Fallback to a basic list if API is unavailable
                return [
                    "Abyssinian", "Aegean", "American Bobtail", "American Curl",
                    "American Shorthair", "American Wirehair", "Arabian Mau",
                    "Australian Mist", "Balinese", "Bambino", "Bengal",
                    "Birman", "Bombay", "British Longhair", "British Shorthair",
                    "Burmese", "Burmilla", "California Spangled", "Chantilly-Tiffany",
                    "Chartreux", "Chausie", "Cheetoh", "Colorpoint Shorthair",
                    "Cornish Rex", "Cymric", "Cyprus", "Devon Rex",
                    "Donskoy", "Dragon Li", "Egyptian Mau", "European Burmese",
                    "Exotic Shorthair", "Havana Brown", "Himalayan", "Japanese Bobtail",
                    "Javanese", "Khao Manee", "Korat", "Kurilian", "LaPerm",
                    "Maine Coon", "Malayan", "Manx", "Munchkin", "Nebelung",
                    "Norwegian Forest Cat", "Ocicat", "Oriental", "Persian",
                    "Pixie-bob", "Ragamuffin", "Ragdoll", "Russian Blue",
                    "Savannah", "Scottish Fold", "Selkirk Rex", "Siamese",
                    "Siberian", "Singapura", "Snowshoe", "Somali", "Sphynx",
                    "Tonkinese", "Toyger", "Turkish Angora", "Turkish Van", "York Chocolate"
                ]
    
    @staticmethod
    async def validate_breed(breed: str) -> bool:
        """Validate if a breed exists in TheCatAPI"""
        breeds = await CatAPIService.get_breeds()
        return breed in breeds
