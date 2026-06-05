class BioStats:
    @staticmethod
    def calculate_metrics(total_seconds):
        total_minutes = total_seconds / 60
        total_hours = total_minutes / 60
        total_days = total_hours / 24

        return {
            "estimated_heartbeats": int(total_minutes * 80), # Avg 80 bpm
            "estimated_breaths": int(total_minutes * 16),    # Avg 16 breaths/min
            "estimated_sleep_years": round((total_days * 8) / 24 / 365, 1), # 8 hours/day
            "total_meals_eaten": int(total_days * 3),
            "skin_cells_renewed": int(total_days / 27) # Skin renews every 27 days
        }