

class MyFilter(logging.Filter):
    def filter(self, rec):
        return rec.levelno <= logging.WARNING

log.addHandler(handler)

log.addFilter(MyFilter())
# OR
log.addFilter(type('', (logging.Filter,), 
    {'filter': staticmethod(lambda r: r.levelno <= logging.WARNING )}))




stream_err = io.StringIO()
file_err = logging.FileHandler(stream_err)
print(stream_debug.getvalue())





