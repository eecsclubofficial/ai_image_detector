from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    IMAGEKIT_PUBLIC_KEY: str
    IMAGEKIT_PRIVATE_KEY: str
    IMAGEKIT_URL_ENDPOINT: str
    DATABASE_URL: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",          
        extra="forbid",          
        case_sensitive=True       
    )

settings = Settings()
    