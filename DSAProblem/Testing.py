from collections import deque
import threading
import math as mh
import sys
MAX_PRIORITY_QUEUE_LEN = 2
COUNTER_LIMIT = 5

express_mutex = threading.Semaphore(1)
priority_mutex = threading.Semaphore(1)
thread_mutex = threading.Semaphore(1)

class Order:
    def __init__(self):
        self.express_orders = []
        self.priority_orders = deque()
        self.priority_order_len = 0
        self.express_orders_len = 0
        self.assigned_orders_threads = []

        self.counter = 0

    def calculate_distance(self, priority_coord, express_coord):
        return mh.sqrt((priority_coord[0] - express_coord[0])**2 + (priority_coord[1] - express_coord[1])**2)

    def assign_orders(self):
        length = min(self.priority_order_len, MAX_PRIORITY_QUEUE_LEN)
        thread_mutex.acquire()
        for _ in range(length):
            priority_mutex.acquire()

            order = self.priority_orders.popleft()
            
            priority_mutex.release()
            
            assigned_express_order = [[[0,0], sys.maxsize] for _ in range(min(order[1], 2))]
            if(order[1] == 0):
                print("Priority Order: ", order[0], " Express Orders: No Express Orders")
            
            elif(order[1] == 1):
                curr_coord = self.express_orders[0]
                curr_dis = self.calculate_distance(order[0], curr_coord) 

                if(curr_dis < assigned_express_order[0][1]):
                    assigned_express_order[0][0] = curr_coord
                    assigned_express_order[0][1] = curr_dis         

                print("Priority Order: ", order[0], " Express Orders: ", assigned_express_order[0][0])
                express_mutex.acquire()

                self.express_orders.remove(assigned_express_order[0][0])
                
                express_mutex.release()
            else:
                for i in range(order[1]):
                    curr_coord = self.express_orders[i]
                    curr_dis = self.calculate_distance(order[0], curr_coord) 

                    if(curr_dis < assigned_express_order[0][1]):
                        assigned_express_order[0][0] = curr_coord
                        assigned_express_order[0][1] = curr_dis
                    elif(curr_dis < assigned_express_order[1][1]):
                        assigned_express_order[1][0] = curr_coord
                        assigned_express_order[1][1] = curr_dis            

                print("Priority Order: ", order[0], " Express Orders: ", assigned_express_order[0][0], assigned_express_order[1][0])
                express_mutex.acquire()

                self.express_orders.remove(assigned_express_order[0][0])
                self.express_orders.remove(assigned_express_order[1][0])
                
                express_mutex.release()
        thread_mutex.release()

    
    def add_express_order(self, order):
        express_mutex.acquire()

        self.express_orders.append(order)
        self.express_orders_len += 1
        self.counter += 1
        express_mutex.release()

        if(self.counter == COUNTER_LIMIT and self.priority_order_len > 0):
            curr_order_thread = threading.Thread(target=self.assign_orders)
            self.assigned_orders_threads.append(curr_order_thread)
            curr_order_thread.start()
            self.priority_order_len -= len(self.priority_orders)
            self.express_orders_len -= 2*len(self.priority_orders)
            if(self.express_orders_len < 0):
                self.express_orders_len = 0
        elif(self.counter == COUNTER_LIMIT):
            self.counter = 0
             
    def add_priority_order(self, order):
        express_order_len = self.express_orders_len - 2*self.priority_order_len
        if(express_order_len < 0):
            express_order_len = self.express_orders_len 
        
        priority_mutex.acquire()
        self.priority_orders.append([order, express_order_len])
        self.priority_order_len += 1
        self.counter = 0
        
        priority_mutex.release()
        if(self.priority_order_len > MAX_PRIORITY_QUEUE_LEN):
            curr_order_thread = threading.Thread(target=self.assign_orders)
            self.assigned_orders_threads.append(curr_order_thread)
            curr_order_thread.start()
            self.priority_order_len -= MAX_PRIORITY_QUEUE_LEN
            self.express_orders_len -= 2*MAX_PRIORITY_QUEUE_LEN
            if(self.express_orders_len < 0):
                self.express_orders_len = 0

    def assign_remaining_orders(self):
        if(self.priority_order_len > 0):
            curr_order_thread = threading.Thread(target=self.assign_orders)
            self.assigned_orders_threads.append(curr_order_thread)
            curr_order_thread.start()
            self.priority_order_len -= len(self.priority_orders)
            self.express_orders_len -= 2*len(self.priority_orders)
            if(self.express_orders_len < 0):
                self.express_orders_len = 0

    def wait_for_threads(self):
        for thread in self.assigned_orders_threads:
            thread.join()


input = [
    ["express", [5, 3]],
    ["express", [1, 2]],
    ["express", [7, 8]],
    ["priority", [4, 5]],
    ["express", [2, 4]],
    ["priority", [6, 6]],
    ["express", [2, 4]],
    ["priority", [6, 6]],
]

order = Order()

for item in input:
    if(item[0] == "express"):
        order.add_express_order(item[1])
    else:
        order.add_priority_order(item[1])
    
order.assign_remaining_orders()
order.wait_for_threads()