import http.server
import socketserver
import csv
import urllib.parse

# Define the port and CSV file
PORT = 8000
CSV_FILE = "todos.csv"

# Custom handler for the to-do app
class TodoHandler(http.server.SimpleHTTPRequestHandler):
    def read_todos(self):
        todos = []
        try:
            with open(CSV_FILE, newline='') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    todos.append({"Task": row["Task"], "Status": row["Status"]})
        except FileNotFoundError:
            # If file doesn't exist, create it with headers
            with open(CSV_FILE, 'w', newline='') as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow(["Task", "Status"])
        return todos

    def write_todo(self, task, status="Pending"):
        with open(CSV_FILE, 'a', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow([task, status])

    def update_todo_status(self, task, new_status):
        todos = self.read_todos()
        with open(CSV_FILE, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["Task", "Status"])
            for todo in todos:
                if todo["Task"] == task:
                    writer.writerow([todo["Task"], new_status])
                else:
                    writer.writerow([todo["Task"], todo["Status"]])

    def generate_html(self, todos):
        html = """
        <html>
        <head>
            <title>To-Do App</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                table { border-collapse: collapse; width: 100%; max-width: 600px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .done { background-color: #e0e0e0; text-decoration: line-through; }
                form { margin-bottom: 20px; }
                input[type="text"] { padding: 5px; width: 70%; }
                input[type="submit"] { padding: 5px 10px; }
            </style>
        </head>
        <body>
            <h1>To-Do List</h1>
            <form method="POST" action="/add">
                <input type="text" name="task" placeholder="Enter a new task" required>
                <input type="submit" value="Add Task">
            </form>
            <table>
                <tr><th>Task</th><th>Status</th><th>Action</th></tr>
        """
        for todo in todos:
            row_class = "done" if todo["Status"] == "Done" else ""
            html += f"""
                <tr class="{row_class}">
                    <td>{todo['Task']}</td>
                    <td>{todo['Status']}</td>
                    <td>
                        <form method="POST" action="/done" style="margin: 0;">
                            <input type="hidden" name="task" value="{todo['Task']}">
                            <input type="submit" value="Mark Done" {"disabled" if todo["Status"] == "Done" else ""}>
                        </form>
                    </td>
                </tr>
            """
        html += """
            </table>
        </body>
        </html>
        """
        return html

    def do_GET(self):
        todos = self.read_todos()
        html_content = self.generate_html(todos)
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(html_content.encode('utf-8'))

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode('utf-8')
        parsed_data = urllib.parse.parse_qs(post_data)

        if self.path == "/add":
            task = parsed_data.get("task", [""])[0]
            if task:
                self.write_todo(task)
        elif self.path == "/done":
            task = parsed_data.get("task", [""])[0]
            if task:
                self.update_todo_status(task, "Done")

        # Redirect back to the main page
        self.send_response(303)
        self.send_header("Location", "/")
        self.end_headers()

# Set up and start the server
Handler = TodoHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()