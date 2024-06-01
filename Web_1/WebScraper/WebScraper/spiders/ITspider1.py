import scrapy

class ITSpider(scrapy.Spider):
    name = "ITspider1"
    allowed_domains = ["ccfddl.github.io"]
    start_urls = ["https://ccfddl.github.io/"]

    def parse(self, response):
        # Sử dụng các selectors chính xác để trích xuất thông tin
        events = response.css('tr.el-table_row')

        # Khởi tạo biến đếm ID
        event_id = 0

        for event in events:
            name = event.css('div.conf-title el-row a::text').get()
            location = event.css('.el-row:nth-of-type(2)::text').get()

            deadline = event.css('.el-row:nth-of-type(3)::text').get()

            date = event.css('.conf-title::text').get()
            notification = event.css('.conf-sub::text').get()

            if name is not None and location is not None and deadline is not None and date is not None and notification is not None:
                yield {
                    'id': event_id,  
                    'name': name,
                    'location': location,
                    'deadline': deadline,
                    'date': date,
                    'notification': notification,
                }

                # Tăng giá trị biến đếm ID lên sau mỗi lần tạo sự kiện mới
                event_id += 1
