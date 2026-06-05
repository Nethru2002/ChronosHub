from datetime import datetime
from dateutil.relativedelta import relativedelta

class ChronosEngine:
    @staticmethod
    def calculate_between(start_str, end_str):
        # Clean the strings
        start_str = start_str.split('.')[0].replace("Z", "")
        end_str = end_str.split('.')[0].replace("Z", "")

        try:
            start = datetime.fromisoformat(start_str)
            end = datetime.fromisoformat(end_str)
        except:
            start = datetime.strptime(start_str, "%Y-%m-%dT%H:%M:%S")
            end = datetime.strptime(end_str, "%Y-%m-%dT%H:%M:%S")
        
        # 1. Hierarchical Difference (The "Age" format)
        diff = relativedelta(end, start)
        
        # 2. Total Absolute Units
        duration = end - start
        total_seconds = duration.total_seconds()
        
        return {
            "hierarchical": {
                "years": diff.years,
                "months": diff.months,
                "days": diff.days,
                "hours": diff.hours,
                "minutes": diff.minutes,
                "seconds": diff.seconds
            },
            "absolute_totals": {
                "total_weeks": int(total_seconds // 604800),
                "total_days": int(total_seconds // 86400),
                "total_hours": int(total_seconds // 3600),
                "total_minutes": int(total_seconds // 60),
                "total_seconds": int(total_seconds)
            }
        }