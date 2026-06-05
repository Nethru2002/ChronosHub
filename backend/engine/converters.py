import math

class UniversalConverter:
    @staticmethod
    def to_unix(dt_obj):
        return dt_obj.timestamp()

    @staticmethod
    def to_julian(dt_obj):
        # Astronomical Julian Date
        a = (14 - dt_obj.month) // 12
        y = dt_obj.year + 4800 - a
        m = dt_obj.month + 12 * a - 3
        jd = dt_obj.day + ((153 * m + 2) // 5) + 365 * y + y // 4 - y // 100 + y // 400 - 32045
        return jd

    @staticmethod
    def to_metric_time(dt_obj):
        # 10 hours per day, 100 minutes per hour, 100 seconds per minute
        seconds_passed = (dt_obj.hour * 3600) + (dt_obj.minute * 60) + dt_obj.second
        metric_seconds = (seconds_passed / 86400) * 100000
        m_hour = metric_seconds // 10000
        m_min = (metric_seconds % 10000) // 100
        return f"{int(m_hour)}:{int(m_min)}"