from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, field_validator
from OrderMail.ordermail import send_order_email  # Import email function

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Order Schema
class Order(BaseModel):
    name: str = Field(..., title="Customer Name")
    email: EmailStr = Field(..., title="Customer Email")
    order_type: str = Field(..., pattern="^(deliver|pickup)$", title="Order Type")  
    phone: str | None = None  
    address: str | None = None  
    items: dict  
    total_price: float

    @field_validator("phone")
    def validate_phone(cls, phone, info):
        if info.data["order_type"] == "deliver" and not phone:
            raise ValueError("Phone number is required for delivery orders.")
        return phone

    @field_validator("address")
    def validate_address(cls, address, info):
        if info.data["order_type"] == "deliver" and not address:
            raise ValueError("Delivery address is required for delivery orders.")
        elif info.data["order_type"] == "pickup":
            return "Tagoloan"
        return address


@app.post("/place-order")
async def place_order(order: Order, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_order_email, order)
    return {"message": "Order placed successfully, email sent!"}
