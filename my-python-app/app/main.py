import logging
import os
from opentelemetry import trace
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.instrumentation.logging import LoggingInstrumentor
from fastapi import FastAPI

resource = Resource.create({"service.name": "api-python"})
trace.set_tracer_provider(TracerProvider(resource=resource))
trace.get_tracer_provider().add_span_processor(
    BatchSpanProcessor(OTLPSpanExporter(endpoint=f"http://{os.environ.get('NODE_IP')}:4317"))
)

app = FastAPI()
logger = logging.getLogger(__name__)

@app.get("/")
def read_root():
    logger.info("hello world!")
    return "Hello From Python App!"

FastAPIInstrumentor.instrument_app(app)
LoggingInstrumentor().instrument(set_logging_format=True)