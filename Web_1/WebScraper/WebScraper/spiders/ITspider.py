import scrapy


class ItspiderSpider(scrapy.Spider):
    name = "ITspider"
    allowed_domains = ["www.lix.polytechnique.fr"]
    start_urls = ["https://www.lix.polytechnique.fr/~hermann/conf.php"]

    def parse(self, response):
        events = response.css('tr')

        # Khởi tạo biến đếm ID
        event_id = 0

        for event in events:
            name = event.css('td.confname a::text').get()
            location = event.css('td.location ::text').get()

            if event.css('td.now-deadline ::text').get() is not None:
                deadline = event.css('td.now-deadline ::text').get()
            else:
                deadline = event.css('td.deadline ::text').get()

            date = event.css('td.date ::text').get()
            notification = event.css('td.notification ::text').get()

            if name is not None and location is not None and deadline is not None and date is not None and notification is not None:
                yield {
                    'id': event_id,  # Sử dụng giá trị biến đếm ID
                    'name': name,
                    'location': location,
                    'deadline': deadline,
                    'date': date,
                    'notification': notification,
                }

                # Tăng giá trị biến đếm ID lên sau mỗi lần tạo sự kiện mới
                event_id += 1
import json

